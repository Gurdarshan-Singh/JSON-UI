import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import ReactJson from "react-json-view";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CircularProgress from "@mui/material/CircularProgress"; // Added for loader
import Button from "@mui/material/Button";

const initialJson = {
  glossary: {
    title: "example glossary",
    GlossDiv: {
      title: "S",
      GlossList: {
        GlossEntry: {
          ID: "SGML",
          SortAs: "SGML",
          GlossTerm: "Standard Generalized Markup Language",
          Acronym: "SGML",
          Abbrev: "ISO 8879:1986",
          GlossDef: {
            para: "A meta-markup language, used to create markup languages such as DocBook.",
            GlossSeeAlso: ["GML", "XML"],
          },
          GlossSee: "markup",
        },
      },
    },
  },
};

const CodeCard = () => {
  const [jsonInput, setJsonInput] = React.useState("");
  const [jsonObject, setJsonObject] = React.useState(initialJson);
  const [error, setError] = React.useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // Added isLoading state

  const theme = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    try {
      const parsedJson = JSON.parse(e.target.value);
      setJsonObject(parsedJson);
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  // Define dark and light themes with adjusted JSON view styles
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
    components: {
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: "#121212", // Darker background
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#ffffff", // White text
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // White divider
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#1e1e1e", // Darker background
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "#333333", // Darker background
            color: "#ffffff", // White text
          },
        },
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  const handleFileUpload = (e) => {
    setIsLoading(true); // Start loading
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsedJson = JSON.parse(event.target.result);
        setJsonInput(event.target.result); // Optionally set input text area value
        setJsonObject(parsedJson);
        setError(null);
      } catch (err) {
        setError("Invalid JSON file");
      } finally {
        setIsLoading(false); // Finish loading
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ minWidth: 275, margin: 5 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              JSON
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                margin: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Input JSON
                </Typography>
                <TextField
                  multiline
                  rows={20}
                  variant="outlined"
                  fullWidth
                  value={jsonInput}
                  onChange={handleInputChange}
                  error={Boolean(error)}
                  helperText={error}
                  sx={{ flex: 1 }}
                  placeholder={JSON.stringify(initialJson, null, 2)}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ marginTop: 2 , color: isDarkMode ? "#ffffff" : "#000000", borderColor: isDarkMode ? "#ffffff" : "#000000"}}
                >
                  Upload JSON File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </Button>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  JSON Tree
                </Typography>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 3,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <ReactJson
                    src={jsonObject}
                    theme={isDarkMode ? "monokai" : "rjv-default"}
                    collapsed={1}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton
              color="inherit"
              aria-label="toggle dark mode"
              onClick={toggleDarkMode}
              sx={{ ml: "auto" }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default CodeCard;
