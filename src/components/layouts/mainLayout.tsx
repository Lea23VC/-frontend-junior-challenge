import Box from "@mui/material/Box";
import ActivityIndicatorBox from "components/feedback/activityIndicatorBox";
import { useSelector } from "react-redux";

import { RootState } from "redux/store";

import { todoState } from "ts/types/todo.types";

export default function MainLayout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const { loaded }: todoState = useSelector((state: RootState) => state.todo);

  return (
    <Box className="max-w-xl m-auto px-2">
      {loaded ? <Box>{children}</Box> : <ActivityIndicatorBox />}
    </Box>
  );
}
