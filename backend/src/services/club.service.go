package service

import (
	"context"
	"log"
	"socialzr/backend/src/database"
	"socialzr/backend/src/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewClubService() *Service {
	c := &Service{}
	c.client = database.GetDatabaseConnection()
	c.collection = c.client.Database("clubs").Collection("clubs_data")
	return c
}

func (c Service) GetAllClubs() []models.Club {
	var results []models.Club

	findOptions := options.Find()
	findOptions.SetLimit(10)
	cur, err := c.collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.TODO()) {
		var elem models.Club
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, elem)
	}
	cur.Close(context.TODO())
	return results
}

func (c Service) GetClubByName(name string) (models.Club, error) {
	var result models.Club

	cursor := c.collection.FindOne(context.TODO(), bson.M{"name": name})
	err := cursor.Decode(&result)
	if err != nil {
		return models.Club{ID: primitive.ObjectID{0}, Name: "", Description: ""}, err
	}
	return result, nil
}

func (c Service) GetClub(id primitive.ObjectID) (models.Club, error) {
	var result models.Club

	cursor := c.collection.FindOne(context.TODO(), bson.M{"_id": id})
	err := cursor.Decode(&result)
	if err != nil {
		return models.Club{ID: primitive.ObjectID{0}, Name: "", Description: ""}, err
	}
	return result, nil
}

func (c Service) GetMembers(id primitive.ObjectID) ([]string, error) {
	var results []string

	club, err := c.GetClub(id)
	if err != nil {
		return results, err
	}
	return club.Members, nil
}

func (c Service) GetEvents(id primitive.ObjectID) ([]string, error) {
	var result []string

	//TODO
	return result, nil
}

func (c Service) CreateClub(obj models.Club) (interface{}, error) {
	if obj.ID == primitive.NilObjectID {
		obj.ID = primitive.NewObjectID()
	}
	res, err := c.collection.InsertOne(context.TODO(), obj)
	return res.InsertedID, err
}

func (c Service) DeleteClub(id primitive.ObjectID) (interface{}, error) {
	res, err := c.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return res.DeletedCount, err
}
