import { NextResponse } from "next/server";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface IResponse {
  success?: boolean;
  message?: string;
  data?: any;
  pagination?: PaginationProps;
  status?: number;
}

const Response = ({
  success = true,
  message = "Success!",
  data,
  pagination,
  status = 200,
}: IResponse) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
      pagination,
    },
    {
      status,
    }
  );
};

export default Response;
