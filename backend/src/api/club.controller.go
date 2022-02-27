package api

import (
	"fmt"
	"socialzr/backend/src/models"
	service "socialzr/backend/src/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func getClub(c *gin.Context) {
	var clubs []models.Club
	clubName := c.Query("name")
	svc := service.NewClubService()
	if clubName != "" {
		club, err := svc.GetClubByName(clubName)
		clubs = append(clubs, club)
		if err != nil {
			c.JSON(400, "No club found with that name")
			return
		}
	} else {
		clubs = svc.GetAllClubs()
	}
	c.JSON(200, clubs)
}

func createClub(c *gin.Context) {
	var club models.Club

	svc := service.NewClubService()
	err := c.BindJSON(&club)
	if err != nil {
		fmt.Println("[ALED]: POST:/club: ", err)
		c.JSON(400, "")
	}
	res, err := svc.CreateClub(club)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func deleteClub(c *gin.Context) {
	clubId := c.Param("id")
	svc := service.NewClubService()
	objID, err := primitive.ObjectIDFromHex(clubId)
	if err != nil {
		panic(err)
	}
	res, err := svc.DeleteClub(objID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func getMembers(c *gin.Context) {
	clubId := c.Param("id")
	svc := service.NewClubService()
	objID, err := primitive.ObjectIDFromHex(clubId)
	if err != nil {
		panic(err)
	}
	res, err := svc.GetMembers(objID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func getEvents(c *gin.Context) {
	clubId := c.Param("id")
	svc := service.NewClubService()
	objID, err := primitive.ObjectIDFromHex(clubId)
	if err != nil {
		panic(err)
	}
	res, err := svc.GetEvents(objID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}
