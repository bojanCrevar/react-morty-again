import React from "react";
import { ActionCtxModel } from "../model/actionCtxModel";

export const ActionContext = React.createContext<ActionCtxModel>({
  handleUpdate: () => {},
});
