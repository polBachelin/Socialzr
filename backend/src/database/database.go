package database
import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
"go.mongodb.org/mongo-driver/mongo/options"
)

var dbHost = getSpecify("NM_DB_HOST", "0.0.0.0")
var dbPort = getSpecify("NM_DB_PORT", "27017")
var uri = "mongodb://" + os.Getenv("NM_DB_USERNAME") + ":" + os.Getenv("NM_DB_PASSWORD") + "@" + dbHost + ":" + dbPort

func getSpecify(vars string, defaultVal string) string {
tmp := os.Getenv(vars)

if len(tmp) == 0 {
	return defaultVal
}
return tmp
}

func GetDatabaseConnection() *mongo.Client {
clientOptions := options.Client().ApplyURI(uri)

client, err := mongo.Connect(context.TODO(), clientOptions)

if err != nil {
	log.Fatal(err)
}

err = client.Ping(context.TODO(), nil)

if err != nil {
	log.Fatal(err)
}

return client
}

type ErrDatabase string

func (e ErrDatabase) Error() string {
return "Invalid Database output -> " + string(e)
}
