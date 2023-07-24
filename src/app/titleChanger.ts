interface ChangeTitleProps {
  title?: string | undefined;
  projectTitle?: string | undefined;
  boardTitle?: string | undefined;
  cardTitle?: string | undefined;
}
export const titleChanger = (
  props: ChangeTitleProps = {
    title: undefined,
    projectTitle: undefined,
    boardTitle: undefined,
    cardTitle: undefined,
  }
) => {
  if (props.title !== undefined) document.title = `Taskit | ${props.title}`;
  if (props.projectTitle !== undefined)
    document.title = `Project | ${props.projectTitle}`;
  if (props.boardTitle !== undefined)
    document.title = `Board | ${props.boardTitle}`;
  if (props.cardTitle !== undefined)
    document.title = `Card | ${props.cardTitle}`;
};
