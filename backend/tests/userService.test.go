package tests

import (
	"socialzr/backend/src/models"
	service "socialzr/backend/src/services"
	"testing"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Test_User_PutGetDelete(t *testing.T) {
	user := models.User{ID: primitive.NewObjectID(), Email: "email@email.com", Password: "password12345"}

	userSvc := service.NewUserService()
	_, err := userSvc.CreateUser(user)
	if err != nil {
		t.Fatal("Error :", err)
	}
	userGot, err := userSvc.GetUser(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	if userGot != user {
		t.Failed()
	}
	_, err = userSvc.DeleteUser(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	_, err = userSvc.GetUser(user.ID)
	if err != nil {
		t.Failed()
	}
}

func Test_User_PutGetByNameDelete(t *testing.T) {
	user := models.User{ID: primitive.NewObjectID(), Email: "email@email.com", Password: "password12345"}

	userSvc := service.NewUserService()
	_, err := userSvc.CreateUser(user)
	if err != nil {
		t.Fatal("Error :", err)
	}
	userGot, err := userSvc.GetUserByName(user.Email)
	if err != nil {
		t.Fatal("Error :", err)
	}
	if userGot != user {
		t.Failed()
	}
	_, err = userSvc.DeleteUser(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	_, err = userSvc.GetUserByName(user.Email)
	if err == nil {
		t.Failed()
	}
}
