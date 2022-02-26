package api

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"regexp"
	"socialzr/backend/src/models"
	service "socialzr/backend/src/services"

	"github.com/gin-gonic/gin"
)

func hashPassword(pass string) string {
	hash := sha512.New()
	hash.Write([]byte(pass))
	return hex.EncodeToString(hash.Sum(nil))
}

func getUser(c *gin.Context) {
	var user models.User
	svc := service.NewUserService()
	err := c.BindJSON(&user)
	if err != nil {
		fmt.Println("[ALED]: GET:/user: ", err)
		c.JSON(400, "")
		return
	}
	user, err = svc.GetUser(user.ID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, user)
}

func getUserLogin(c *gin.Context) {
	var user models.User
	var dbuser models.User
	svc := service.NewUserService()
	err := c.BindJSON(&user)
	if err != nil {
		fmt.Println("[ALED]: GET:/user/login: ", err)
		c.JSON(400, "")
		return
	}
	dbuser, err = svc.GetUserByName(user.Email)
	if err != nil {
		c.JSON(500, "")
		return
	}
	if dbuser.Password == hashPassword(user.Password) {
		c.JSON(200, dbuser)
	} else {
		c.JSON(401, "")
	}
}

func putUser(c *gin.Context) {
	var user models.User
	svc := service.NewUserService()
	err := c.BindJSON(&user)
	if err != nil {
		fmt.Println("[ALED]: PUT:/user: ", err)
		c.JSON(400, "")
		return
	}
	user.Password = hashPassword(user.Password)
	res, err := svc.CreateUser(user)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func deleteUser(c *gin.Context) {
	var user models.User
	svc := service.NewUserService()
	err := c.BindJSON(&user)
	if err != nil {
		fmt.Println("[ALED]: DELETE:/user: ", err)
		c.JSON(400, "")
	}
	res, err := svc.DeleteUser(user.ID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func isValidateNewUser(user models.User, svc *service.Service) (bool, string) {
	lenPass := len([]rune(user.Password))
	if lenPass < 10 || lenPass > 64 {
		return false, "Error password length 10 -> 64"
	}
	match, err := regexp.MatchString("^[a-zA-Z0-9]+.?[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$", user.Email)
	if err != nil {
		return false, "Error regex " + err.Error()
	}
	if !match {
		return false, "Error email must be an email -> " + user.Email
	}
	var _, getByNameErr = svc.GetUserByName((user.Email))
	if getByNameErr == nil {
		return false, "Error email already exists -> " + user.Email
	}
	return true, "Ok"
}

func createUserLogin(c *gin.Context) {
	var user models.User
	errorBind := c.BindJSON(&user)

	if errorBind != nil {
		fmt.Println("[ALED]: PUT:/user: ", errorBind)
		c.JSON(400, "")
		return
	}
	svc := service.NewUserService()
	ok, err := isValidateNewUser(user, svc)
	if ok {
		user.Password = hashPassword(user.Password)
		res, err := svc.CreateUser(user)
		if err != nil {
			c.JSON(500, "")
			return
		}
		c.JSON(200, res)
	} else {
		c.JSON(400, "Invalid username or password: "+err)
	}
}
