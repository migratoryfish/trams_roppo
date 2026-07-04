import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Popper,
  TextField,
} from "@mui/material";
import { Backspace, ReplyAll } from "@mui/icons-material";
import { useState } from "react";
import { findArticleIndex } from "../util/util";
import { useLawArticles } from "../libs/useLawData";

export type ArticleJumpByNumberProps = {
  open: boolean;
  onClose: (value: string) => void;
  sendJump: (value: string) => void;
  lawId: string;
};

const ArticleJumpByNumber = ({
  open,
  onClose,
  sendJump,
  lawId,
}: ArticleJumpByNumberProps) => {
  //Popperテストコード
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [articleNumber, setArticleNumber] = useState<string>("");
  //フックでデータを取得し、検索は純粋関数(findArticleIndex)で行う
  const { articles } = useLawArticles(lawId);
  const strarticleNumber = findArticleIndex(articles, articleNumber).toString();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setArticleNumber("");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNumButton = (event: React.MouseEvent<HTMLElement>) => {
    setArticleNumber(articleNumber + event.currentTarget.textContent);
  };
  const handleJump = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    sendJump(strarticleNumber);
  };

  const handleBack = (event: React.MouseEvent<HTMLElement>) => {
    setArticleNumber(articleNumber.slice(0, -1));
  };

  const _open = Boolean(anchorEl);
  const id = _open ? "simple-popper" : undefined;

  //Popperテストコードここまで

  return (
    <>
      <Box sx={{ display: "inline-block" }}>
        <button aria-describedby={id} type="button" onClick={handleClick}>
          条文番号ジャンプ
        </button>
      </Box>
      <Popper id={id} open={_open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            p: 1,
            bgcolor: "background.paper",
            display: "flex",
            "& > *": {
              m: 1,
            },
          }}
        >
          <Grid>
            <Grid>
              <TextField
                disabled
                id="outlined-disabled"
                label="条文番号"
                defaultValue=""
                value={articleNumber}
              />
            </Grid>
            <Grid container>
              <Grid>
                <Grid>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="vertical outlined button group"
                  >
                    <Button key="one" onClick={handleNumButton}>
                      1
                    </Button>
                    <Button key="two" onClick={handleNumButton}>
                      2
                    </Button>
                    <Button key="three" onClick={handleNumButton}>
                      3
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid>
                  <ButtonGroup variant="outlined">
                    <Button onClick={handleNumButton}>4</Button>
                    <Button onClick={handleNumButton}>5</Button>
                    <Button onClick={handleNumButton}>6</Button>
                  </ButtonGroup>
                </Grid>
                <Grid>
                  <ButtonGroup variant="outlined">
                    <Button onClick={handleNumButton}>7</Button>
                    <Button onClick={handleNumButton}>8</Button>
                    <Button onClick={handleNumButton}>9</Button>
                  </ButtonGroup>
                </Grid>
                <Grid>
                  <ButtonGroup variant="outlined">
                    <Button onClick={handleNumButton} disabled></Button>
                    <Button onClick={handleNumButton}>0</Button>
                    <Button onClick={handleNumButton} disabled></Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <ButtonGroup orientation="vertical" variant="outlined">
                    <Button onClick={handleNumButton}>の</Button>
                    <Button onClick={handleBack}>
                      <Backspace
                        sx={{
                          transform: "Scale(0.8, 0.8)",
                        }}
                      ></Backspace>
                    </Button>
                    <Button onClick={handleJump}>
                      <ReplyAll
                        sx={{
                          transform: "Scale(-1.2, 1.2)",
                        }}
                      />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popper>
    </>
  );
};

export default ArticleJumpByNumber;
