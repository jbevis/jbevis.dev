import React from "react";
import Markdown from "react-markdown";
import { Container } from "./container";
import { Section } from "./section";
import { ThemeContext } from "./theme";

export const Project = ({ data }) => {
  const theme = React.useContext(ThemeContext);
  const titleColorClasses = {
    blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
    teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-300 to-pink-500",
    purple:
      "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
    orange:
      "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
    yellow:
      "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
  };

  return (
    <Section className="flex-1">
      <Container className={`flex-1 max-w-4xl pb-2`} size="large">
        <h2
          className={`w-full relative	mb-8 text-6xl leading-tight font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              titleColorClasses[theme.color]
            }`}
          >
            {data.title}
          </span>
        </h2>
      </Container>
      {data.heroImg && (
        <div className="px-6 max-w-4xl lg:max-w-6xl flex justify-center mx-auto">
          <img
            src={data.heroImg}
            className="mb-14 block h-auto max-w-full mx-auto object-cover rounded-md"
            style={{ maxHeight: "80vh" }}
          />
        </div>
      )}
      <Container className={`flex-1 max-w-4xl pt-4`} size="large">
        <div className="prose dark:prose-dark  w-full max-w-none">
          <Markdown>{data.body}</Markdown>
        </div>
      </Container>
    </Section>
  );
};
