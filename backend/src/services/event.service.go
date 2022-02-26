package service

import (
	"context"
	"socialzr/backend/src/database"
	"socialzr/backend/src/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func NewEventService() *Service {
	e := &Service{}
	e.client = database.GetDatabaseConnection()
	e.collection = e.client.Database("events").Collection("events_data")
	return e
}

func (e Service) CreateEvent(obj models.Event) (interface{}, error) {
	if obj.ID == primitive.NilObjectID {
		obj.ID = primitive.NewObjectID()
	}
	res, err := e.collection.InsertOne(context.TODO(), obj)
	return res.InsertedID, err
}

func (e Service) UpdateEvent(obj models.Event, id primitive.ObjectID) {
	event, err := e.GetAnEvent(id)
	if err != nil {
		return
	}
	event.Descritpion = obj.Descritpion
	event.Title = obj.Title
	event.Date = obj.Date
}

func (e Service) DeleteEvent(id primitive.ObjectID) (interface{}, error) {
	res, err := e.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return res.DeletedCount, err
}

func (e Service) GetAnEvent(id primitive.ObjectID) (models.Event, error) {
	var result models.Event

	cursor := e.collection.FindOne(context.TODO(), bson.M{"_id": id})
	err := cursor.Decode(&result)
	if err != nil {
		return models.Event{ID: primitive.ObjectID{0}, Title: "", Descritpion: ""}, err
	}
	return result, nil
}

func (e Service) SubscribeToEvent(userId primitive.ObjectID, eventId primitive.ObjectID) {
	change := bson.M{"$push": bson.M{"participants": userId}}
	e.collection.UpdateByID(context.TODO(), eventId, change)
}

func (e Service) UnsubscribeToEvent(userId primitive.ObjectID, eventId primitive.ObjectID) {
	change := bson.M{"$pull": bson.M{"participants": userId}}
	e.collection.UpdateByID(context.TODO(), eventId, change)
}
