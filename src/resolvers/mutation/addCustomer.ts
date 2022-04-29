import { MutationResolvers } from "../../types/generated/graphql";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// const ddb = new DynamoDBClient({
//   endpoint: "http://localhost:8000",
// });

const ddb = new DynamoDBClient({});

type SendItemType = {
  customerId: { S: string };
  customerName: { S: string };
};

const sendData = async (customer: SendItemType) => {
  try {
    const data = await ddb.send(
      new PutItemCommand({
        TableName: "Customer",
        Item: customer,
      })
    );
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addCustomer: MutationResolvers["addCustomer"] = async (
  parent,
  args,
  context,
  info
) => {
  if (args.input === undefined || args.input === null) {
    throw new Error();
  } else {
    try {
      let customerUuid = uuidv4();
      const covertedCustomer: SendItemType = {
        customerId: { S: customerUuid },
        customerName: { S: args.input.customerName },
      };
      const customer = await sendData(covertedCustomer);
      return args.input;
    } catch (err) {
      throw new Error();
    }
  }
};
