import { NextResponse } from "next/server";

interface IResponse {
  success?: boolean;
  message?: string;
  data?: any;
  status?: number;
}

const Response = ({
  success = true,
  message = "Success!",
  data,
  status = 200,
}: IResponse) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    {
      status,
    }
  );
};

export default Response;
