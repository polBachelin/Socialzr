package api

import (
	"fmt"
	"socialzr/backend/src/models"
	service "socialzr/backend/src/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func createEvent(c *gin.Context) {
	var event models.Event

	svc := service.NewEventService()
	err := c.BindJSON(&event)
	if err != nil {
		fmt.Println("[ALED]: POST:/event: ", err)
		c.JSON(400, "")
	}
	res, err := svc.CreateEvent(event)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}

func deleteEvent(c *gin.Context) {
	eventid := c.Param("id")
	svc := service.NewEventService()
	objID, err := primitive.ObjectIDFromHex(eventid)
	if err != nil {
		panic(err)
	}
	res, err := svc.DeleteEvent(objID)
	if err != nil {
		c.JSON(500, "")
		return
	}
	c.JSON(200, res)
}
