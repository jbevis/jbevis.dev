import { Project } from "../../components/project";
import { getStaticPropsForTina, staticRequest } from "tinacms";
import { layoutQueryFragment } from "../../components/layout";
import type { ProjectsDocument } from "../../.tina/__generated__/types";
import FourOhFour from "../404";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  if (props.data && props.data.getProjectsDocument) {
    return <Project {...props.data.getProjectsDocument} />;
  }
  // We're likely loading a new document that doesn't yet have data
  // show the 404 which will quickly be replace by client side content
  // from Tina
  return <FourOhFour />;
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = (await getStaticPropsForTina({
    query: `#graphql
      query ProjectQuery($relativePath: String!) {
        ${layoutQueryFragment}
        getPostsDocument(relativePath: $relativePath) {
          data {
            title
            heroImg
            body
          }
        }
      }
    `,
    variables: { relativePath: `${params.filename}.md` },
  })) as { data: { getProjectsDocument: ProjectsDocument } };
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const projectsListData = (await staticRequest({
    query: `#graphql
      {
        getProjectsList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
  })) as any;
  return {
    paths: projectsListData.getProjectsList.edges.map((project) => ({
      params: { filename: project.node.sys.filename },
    })),
    fallback:'blocking',
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
