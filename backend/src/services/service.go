package service

import "go.mongodb.org/mongo-driver/mongo"

type Service struct {
	client     *mongo.Client
	collection *mongo.Collection
}
