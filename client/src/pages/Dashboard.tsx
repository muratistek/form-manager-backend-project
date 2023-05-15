import { gql, useQuery } from "@apollo/client";
import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import styled from "@emotion/styled";
import { startCase, uniq } from "lodash";
import { EntriesQuery } from "../generated/graphql";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const Dashboard: React.FC = () => {
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

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  const { entries } = data!;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'publishedAt', headerName: 'Published', width: 250 },
    ...uniq(entries.flatMap((s) => Object.keys(s.formData))).map((field) => ({
      field,
      headerName: startCase(field),
      width: 175,
      valueGetter: (params: GridValueGetterParams) => params.row.formData[field]
    }))
  ];

  return (
    <Container>
      <DataGrid
        rows={entries}
        columns={columns}
        disableSelectionOnClick
      />
    </Container>
  )
}

export default Dashboard;