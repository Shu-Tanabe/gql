import {
  GraphQLScalarType,
  Kind,
  GraphQLScalarTypeConfig,
  ValueNode,
} from "graphql";
import moment from "moment";

const config: GraphQLScalarTypeConfig<moment.Moment, string> = {
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: moment.Moment) {
    return value.format();
  },
  parseValue(value: string) {
    return moment(value);
  },
  parseLiteral(ast: ValueNode) {
    switch (ast.kind) {
      case Kind.STRING:
        return moment(ast.value);
      default:
        return null;
    }
  },
};

export const datetimeScalar = () => new GraphQLScalarType(config);
