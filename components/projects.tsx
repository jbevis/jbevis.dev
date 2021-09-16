import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { BsArrowRight } from "react-icons/bs";
import { ThemeContext } from "./theme";
import format from "date-fns/format";

export const Projects = ({ data }) => {
  const theme = React.useContext(ThemeContext);
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };

  return (
    <>
      {data.map((projectData) => {
        const project = projectData.node;

        return (
          <Link
            key={project.sys.filename}
            href={`/projects/` + project.sys.filename}
            passHref
          >
            <a
              key={project.id}
              className="group block px-8 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-700 dark:from-gray-800 dark:to-gray-700 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-600"
            >
              <img
                className="h-14 w-14 object-cover rounded-full shadow-sm"
                src={project.heroImg}
                alt={project.title}
              />
              <h3
                className={`text-gray-900 dark:text-white text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out ${
                  titleColorClasses[theme.color]
                }`}
              >
                {project.values.title}{" "}
                <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" />
                </span>
              </h3>
              <div className="prose dark:prose-dark prose-lg w-full max-w-none mb-5">
                <Markdown>{project.values.summary}</Markdown>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
};
