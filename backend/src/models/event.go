package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Event struct {
	ID           primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Title        string             `form:"title" bson:"title" json:"title"`
	Descritpion  string             `form:"description" bson:"description" json:"description"`
	Date         string             `bson:"date" json:"date"`
	Participants []string           `form:"participants" bson:"participants" json:"participants"`
}
