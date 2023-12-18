import React from "react";
import { Home } from "@/_features/Home.tsx";
import { Layouts } from "@/_utils/constants.ts";

export const layout = Layouts.BaseLayout;

type Props = {
  search: Lume.Data["search"];
};

export default function ({ search }: Props) {
  const recentThoughts = search.pages("thought", "date=desc", 10);
  return <Home recentThoughts={recentThoughts} />;
}
