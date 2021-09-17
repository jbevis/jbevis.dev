import { getStaticPropsForTina } from "tinacms";
import { Container } from "../components/container";
import { Section } from "../components/section";
import { Projects } from "../components/projects";
import { layoutQueryFragment } from "../components/layout";
import type { ProjectsConnection } from "../.tina/__generated__/types";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const projects = props.data.getProjectsList.edges;

  return (
    <Section className="flex-1">
      <Container size="large">
        <Projects data={projects} />
      </Container>
    </Section>
  );
}

export const getStaticProps = async () => {
  const tinaProps = (await getStaticPropsForTina({
    query: `#graphql
      query PageQuery {
        ${layoutQueryFragment}
        getProjectsList {
          edges {
            node {
              id
              values
              data {
                title
                heroImg
                summary
              }
              sys {
                filename
              }
            }
          }
        }
      }
    `,
    variables: {},
  })) as { data: { getProjectsList: ProjectsConnection } };

  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
