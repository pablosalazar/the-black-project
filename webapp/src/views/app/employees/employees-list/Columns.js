import React from 'react';
import Avatar from 'react-avatar';
import { RESOURCE_URL } from '../../../../constants/defaultValues';

const cols = [
  {
    Header: 'ID',
    accessor: 'id',
    cellClass: 'list-item-heading w-5',
    Cell: (props) => <>{props.value}</>,
  },
  {
    Header: 'Foto',
    accessor: 'photo',
    disableSortBy: true,
    cellClass: 'w-10',
    Cell: (props) => {
      if (props.value) {
        return <Avatar size="40" src={`${RESOURCE_URL}${props.value}`} round />;
      }
      return (
        <Avatar
          size="40"
          maxInitials={2}
          name={props.row.original.fullname}
          round
        />
      );
    },
  },
  {
    Header: 'Nombres',
    accessor: 'firstname',
    cellClass: 'w-20',
    Cell: (props) => <>{props.value}</>,
  },
  {
    Header: 'Apellidos',
    accessor: 'lastname',
    cellClass: 'w-20',
    Cell: (props) => <>{props.value}</>,
  },
  {
    Header: '# Documento',
    accessor: 'document_number',
    cellClass: 'w-20',
    Cell: (props) => <>{props.value}</>,
  },
  {
    Header: 'Cargo',
    accessor: 'role',
    cellClass: 'w-25',
    Cell: (props) => <>{props.value}</>,
  },
];

export default cols;
