import httpStatus from "http-status";
import { IBaseResponse } from "../interfaces/base-response.interface";

const notFoundRes = (): IBaseResponse<any> => {
  return {
    status: httpStatus.NOT_FOUND,
    message: httpStatus["404_NAME"],
  };
};

const internalServerErrorRes = (errMsg?: string): IBaseResponse<any> => {
  return {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: httpStatus["500_NAME"],
    error: errMsg,
  };
};

function createdRes<T>(data: T): IBaseResponse<T> {
  return {
    status: httpStatus.CREATED,
    message: httpStatus["201_NAME"],
    data: data,
  };
}

function successRes<T>(data?: T): IBaseResponse<T> {
  if (data) {
    return {
      status: httpStatus.OK,
      message: httpStatus["200_NAME"],
      data: data,
    };
  }

  return { status: httpStatus.OK, message: httpStatus["200_NAME"] };
}

const forbiddenAccessRes = (): IBaseResponse<any> => {
  return { status: httpStatus.FORBIDDEN, message: httpStatus["403_NAME"] };
};

const unauthorizedRes = (): IBaseResponse<any> => {
  return { status: httpStatus.UNAUTHORIZED, message: httpStatus["401_NAME"] };
};

const badRequestRes = (errMsg?: string): IBaseResponse<any> => {
  if (errMsg) {
    return { status: httpStatus.BAD_REQUEST, message: errMsg };
  }

  return { status: httpStatus.BAD_REQUEST, message: httpStatus["400_NAME"] };
};

export {
  notFoundRes,
  internalServerErrorRes,
  createdRes,
  successRes,
  forbiddenAccessRes,
  unauthorizedRes,
  badRequestRes,
};
