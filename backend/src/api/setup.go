package api

import "github.com/gin-gonic/gin"

func output204(c *gin.Context) {
	c.JSON(204, "")
}

func Setup(r *gin.Engine) {
	r.POST("/user", getUser)
	r.POST("/user/login", getUserLogin)
	r.PUT("/user/register", createUserLogin)
	r.PUT("/user", putUser)
	r.DELETE("/user", deleteUser)

	r.GET("/", output204)
}
