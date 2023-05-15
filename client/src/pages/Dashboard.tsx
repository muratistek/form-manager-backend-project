import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import styled from "@emotion/styled";
import { startCase, uniq } from "lodash";
import { EntriesQuery } from "../generated/graphql";
import { createTheme, CssBaseline, Button as ButtonMui } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`

const Dashboard: React.FC = () => {
  const [dark, setDark] = useState(true)
  const [clicked, setClicked] = useState(false);

  const { data, error, loading } = useQuery<EntriesQuery>(
    gql`
      query Entries {
        entries {
          id
          publishedAt
          formData
        }
      }
    `
  )

  const [generateFormData] = useMutation(gql`
    mutation GenerateFormData($count: Int!) {
      queueEntryGeneration(count: $count)
    }
  `, { variables: { count: 15 } })

  const [deleteFormData] = useMutation(gql`
    mutation DeleteFormData {
      deleteFormData
    }
  `)

  const handleClick = (action: string) => {
    setClicked(true);

    if (action === "generate") {
      generateFormData()
    }
    else if (action === "delete") {
      deleteFormData()
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }), [dark])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  const { entries } = data!;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'publishedAt', headerName: 'Published', width: 250 },
    ...uniq(entries.flatMap((s) => Object.keys(s.formData))).map((field) => ({
      field,
      headerName: startCase(field),
      width: 250,
      valueGetter: (params: GridValueGetterParams) => params.row.formData[field]
    }))
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container >
        <ActionBar>
          <ButtonMui
            color="primary"
            size="small"
            variant="contained"
            onClick={() => handleClick('generate')}
            disabled={clicked}
          >
            Generate Form Data
          </ButtonMui>
          <ButtonMui
            color="primary"
            size="small"
            variant="contained"
            onClick={() => handleClick('delete')}
            disabled={clicked}
            style={{ marginLeft: '30px' }}
          >
            Delete Form Data
          </ButtonMui>
          <ButtonMui
            color="primary"
            size="small"
            variant="contained"
            onClick={() => setDark(!dark)}
            style={{ marginLeft: '30px', marginRight: '100px' }}
          >
            Change Theme
          </ButtonMui>
        </ActionBar>
        <CssBaseline />
        <DataGrid
          rows={entries}
          columns={columns}
          disableSelectionOnClick
        />

      </Container>
    </ThemeProvider>
  )
}

export default Dashboard;