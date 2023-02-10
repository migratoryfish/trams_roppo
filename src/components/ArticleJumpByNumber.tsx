import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { Grid3x3, Reply, ReplyAll, Scale } from "@mui/icons-material";

export type ArticleJumpByNumberProps = {
  open: boolean;
  onClose: (value: string) => void;
};

const ArticleJumpByNumber = (props: ArticleJumpByNumberProps) => {
  const { onClose, open } = props;

  const handleClose = (value: string) => {
    onClose(value);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle></DialogTitle>
      <Grid>
        <Grid>
          <ButtonGroup>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </Grid>
        <Grid>
          <ButtonGroup>
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
          </ButtonGroup>
        </Grid>
        <Grid>
          <ButtonGroup>
            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
          </ButtonGroup>
        </Grid>
        <Grid>
          <ButtonGroup>
            <Button>の</Button>
            <Button>0</Button>
            <Button>
              <ReplyAll
                sx={{
                  transform: "Scale(-0.5, 0.5)",
                  padding: "0",
                  margin: "0",
                }}
              />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ArticleJumpByNumber;
