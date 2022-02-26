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
	_, err := userSvc.Create(user)
	if err != nil {
		t.Fatal("Error :", err)
	}
	userGot, err := userSvc.Get(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	if userGot != user {
		t.Failed()
	}
	_, err = userSvc.Delete(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	_, err = userSvc.Get(user.ID)
	if err != nil {
		t.Failed()
	}
}

func Test_User_PutGetByNameDelete(t *testing.T) {
	user := models.User{ID: primitive.NewObjectID(), Email: "email@email.com", Password: "password12345"}

	userSvc := service.NewUserService()
	_, err := userSvc.Create(user)
	if err != nil {
		t.Fatal("Error :", err)
	}
	userGot, err := userSvc.GetByName(user.Email)
	if err != nil {
		t.Fatal("Error :", err)
	}
	if userGot != user {
		t.Failed()
	}
	_, err = userSvc.Delete(user.ID)
	if err != nil {
		t.Fatal("Error :", err)
	}
	_, err = userSvc.GetByName(user.Email)
	if err == nil {
		t.Failed()
	}
}
