package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Club struct {
	ID          primitive.ObjectID   `bson:"_id" json:"id,omitempty"`
	Members     []string             `form:"members" bson:"members" json:"members"`
	Name        string               `form:"name" bson:"name" json:"name"`
	Description string               `bson:"description" json:"description"`
	Events      []primitive.ObjectID `bson:"events" json:"events"`
	Admins      []primitive.ObjectID `bson:"admins" json:"admins"`
}
