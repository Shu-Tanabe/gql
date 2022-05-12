aws dynamodb create-table \
--table-name Restaurant \
--attribute-definitions \
AttributeName=Occasion,AttributeType=S \
AttributeName=RestaurantId,AttributeType=S \
--key-schema AttributeName=Occasion,KeyType=HASH AttributeName=RestaurantId,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
--endpoint-url http://localhost:8000

# AttributeName=RestaurantName,KeyType=RANGE
# AttributeName=RestaurantName,AttributeType=S \
# AttributeName=Score,AttributeType=N \
# AttributeName=Introducer,AttributeType=S \
# AttributeName=Description,AttributeType=S \