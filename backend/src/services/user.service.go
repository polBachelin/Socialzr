package service

import (
	"context"
	"socialzr/backend/src/database"
	"socialzr/backend/src/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewUserService() *UserService {
	u := &UserService{}
	u.client = database.GetDatabaseConnection()
	u.collection = u.client.Database("users").Collection("user_data")
	return u
}

func (u UserService) GetByName(email string) (models.User, error) {
	var result models.User

	cursor := u.collection.FindOne(context.TODO(), bson.M{"email": email})
	err := cursor.Decode(&result)
	if err != nil {
		return models.User{ID: primitive.ObjectID{0}, Email: "", Password: ""}, err
	}
	return result, nil
}

func (u UserService) Get(id primitive.ObjectID) (models.User, error) {
	var result models.User

	cursor := u.collection.FindOne(context.TODO(), bson.M{"_id": id})
	err := cursor.Decode(&result)
	if err != nil {
		return models.User{ID: primitive.ObjectID{0}, Email: "", Password: ""}, err
	}
	return result, nil
}

func (u UserService) Delete(id primitive.ObjectID) (interface{}, error) {
	res, err := u.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return res.DeletedCount, err
}

func (u UserService) Create(obj models.User) (interface{}, error) {
	if obj.ID == primitive.NilObjectID {
		obj.ID = primitive.NewObjectID()
	}
	res, err := u.collection.InsertOne(context.TODO(), obj)
	return res.InsertedID, err
}
