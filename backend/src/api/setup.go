package api

import "github.com/gin-gonic/gin"

func output204(c *gin.Context) {
	c.JSON(204, "")
}

func Setup(r *gin.Engine) {
	//User
	r.POST("/user", getUser)
	r.POST("/user/login", getUserLogin)
	r.PUT("/user/register", createUserLogin)
	r.PUT("/user", putUser)
	r.DELETE("/user", deleteUser)

	//Club
	r.GET("/club", getClub)
	r.POST("/club", createClub)
	r.GET("/club/:id", deleteClub)
	r.GET("/club/:id/members", getMembers)
	r.GET("/club/:id/events", getEvents)

	//Event
	r.POST("/event", createEvent)
	r.DELETE("/event/:id", deleteEvent)
	r.PUT("/event/:id", updateEvent)
	r.POST("/event/:id/subscribe", subscribeToEvent)
	r.POST("/event/:id/unsubscribe", unubscribeToEvent)
	r.GET("/", output204)
}
