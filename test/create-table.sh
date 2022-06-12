# aws dynamodb create-table \
# --table-name Restaurant \
# --attribute-definitions \
# AttributeName=Occasion,AttributeType=S \
# AttributeName=RestaurantId,AttributeType=S \
# --key-schema AttributeName=Occasion,KeyType=HASH AttributeName=RestaurantId,KeyType=RANGE \
# --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
# --endpoint-url http://localhost:8000


aws dynamodb create-table \
--table-name RestaurantsAndUsers \
--attribute-definitions \
AttributeName=ObjectId,AttributeType=S \
AttributeName=DataType,AttributeType=S \
--key-schema AttributeName=ObjectId,KeyType=HASH AttributeName=DataType,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
--endpoint-url http://localhost:8000