import React from "react";

type Props = {
  prep: number | undefined;
  cook: number | undefined;
  wait: number | undefined;
};

function prettyPrintTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime = hours > 1 ? `${hours} hrs` : `${hours} hr`;
    if (remainder > 0) {
      formattedTime = formattedTime + " ";
    }
  }

  if (remainder > 0) {
    formattedTime = formattedTime + `${remainder} min`;
  }

  return formattedTime;
}

export function RecipeTime({ prep = 0, cook = 0, wait = 0 }: Props) {
  const totalTime = prep + cook + wait;
  return (
    <>
      {Boolean(prep) && <p>Prep time: {prettyPrintTime(prep)}</p>}
      {Boolean(cook) && <p>Cook time: {prettyPrintTime(cook)}</p>}
      {Boolean(wait) && <p>Wait time: {prettyPrintTime(wait)}</p>}
      {<p>Total time: {prettyPrintTime(totalTime)}</p>}
    </>
  );
}
