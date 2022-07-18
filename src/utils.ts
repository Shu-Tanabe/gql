import { Sequelize, DataTypes } from "sequelize";

export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  getCursor = (item) => null, //修正ポイント
}) => {
  if (pageSize < 1) return [];
  if (!cursor) return results.slice(0, pageSize); //cursorがなければ0からpageSizeまで取得

  const cursorIndex = results.findIndex((item) => {
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

export const createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.sqlite",
  });

  const users = db.define("user", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    email: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    token: DataTypes.STRING,
  });

  const trips = db.define("trip", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    launchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  return { db, users, trips };
};
