import styled from "styled-components";
import Wordle from "./projects/wordle/index.jsx";
import Scrabble from "./projects/scrabble/index.jsx";

const projects = [
  {
    name: "Wordle",
    description: "A five-letter word guessing game.",
    path: "/projects/wordle",
    component: Wordle,
  },
  {
    name: "Scrabble",
    description: "Given an input string, return all possible valid words",
    path: "/projects/scrabble",
    component: Scrabble,
  },
];

const Page = styled.main`
  min-height: 100vh;
  padding: 48px clamp(20px, 6vw, 88px);
  box-sizing: border-box;
  background: #f6f5f0;
  color: #252821;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 980px;
  margin: 0 auto 72px;
  padding-bottom: 16px;
  border-bottom: 1px solid #d6d6cc;
`;

const Wordmark = styled.a`
  color: inherit;
  font: 700 14px/1.2 var(--mono);
  text-decoration: none;
  text-transform: uppercase;
`;

const HeaderNote = styled.span`
  color: #70736a;
  font: 12px/1.2 var(--mono);
  text-transform: uppercase;
`;

const Content = styled.section`
  max-width: 980px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #55735c;
  font: 12px/1.2 var(--mono);
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0 0 40px;
  color: #252821;
  font:
    500 clamp(36px, 7vw, 64px)/1 Georgia,
    serif;
  letter-spacing: 0;
`;

const ProjectList = styled.div`
  border-top: 1px solid #bfc1b5;
`;

const ProjectLink = styled.a`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  min-height: 92px;
  border-bottom: 1px solid #bfc1b5;
  color: inherit;
  text-decoration: none;

  &:hover .project-name,
  &:focus-visible .project-name {
    color: #55735c;
  }

  &:focus-visible {
    outline: 2px solid #55735c;
    outline-offset: 3px;
  }
`;

const ProjectNumber = styled.span`
  color: #85877d;
  font: 12px/1 var(--mono);
`;

const ProjectInfo = styled.span`
  display: grid;
  gap: 6px;
`;

const ProjectName = styled.span.attrs({ className: "project-name" })`
  font:
    600 20px/1.2 Georgia,
    serif;
  transition: color 140ms ease;
`;

const ProjectDescription = styled.span`
  color: #70736a;
  font-size: 14px;
`;

const ProjectArrow = styled.span`
  color: #55735c;
  font-size: 22px;
`;

function ProjectIndex() {
  return (
    <>
      <Eyebrow>Projects / 01</Eyebrow>
      <Title>Small things, in progress.</Title>
      <ProjectList>
        {projects.map((project, index) => (
          <ProjectLink href={project.path} key={project.path}>
            <ProjectNumber>{String(index + 1).padStart(2, "0")}</ProjectNumber>
            <ProjectInfo>
              <ProjectName>{project.name}</ProjectName>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectInfo>
            <ProjectArrow aria-hidden="true">↗</ProjectArrow>
          </ProjectLink>
        ))}
      </ProjectList>
    </>
  );
}

function App() {
  const project = projects.find(
    ({ path }) => path === window.location.pathname,
  );
  const ActiveProject = project?.component;

  return (
    <Page>
      <Header>
        <Wordmark href="/">Index</Wordmark>
        <HeaderNote>{project ? "Project 01" : "Personal projects"}</HeaderNote>
      </Header>
      <Content>{ActiveProject ? <ActiveProject /> : <ProjectIndex />}</Content>
    </Page>
  );
}

export default App;
