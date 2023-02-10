import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { v4 as uuidv4 } from "uuid";
type Props = {
  part: string;
  chapter: string;
  section: string;
  subSection: string;
  division: string;
};

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const CustomSeparator: React.FC<Props> = ({
  part,
  chapter,
  section,
  subSection,
  division,
}) => {
  const pandektens = [part, chapter, section, subSection, division];
  const breadcrumbs = pandektens.map((pandekten, index, parent) => {
    return pandekten ? (
      <Typography
        key={uuidv4()}
        color={index === parent.length - 1 ? "text.primary" : ""}
        sx={{ fontSize: 12 }}
      >
        {"第" +
          pandekten +
          (index === 0
            ? "編"
            : index === 1
            ? "章"
            : index === 2
            ? "節"
            : index === 3
            ? "款"
            : index === 4
            ? "目"
            : "")}
      </Typography>
    ) : (
      ""
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default CustomSeparator;
