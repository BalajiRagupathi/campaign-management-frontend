// User column
export const user_columns = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
];

// Offer column
export const offer_columns = [
  {
    Header: "OFFER ID",
    Footer: "OFFER ID",
    accessor: "offer_id"
  },
  {
    Header: "Created By",
    Footer: "Created By",
    accessor: "user_id.email",
  },
  {
    Header: "Created At",
    Footer: "Created At",
    accessor: "created_at",
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
  },
]

// Scheduled column
export const scheduled_column = [
  {
    Header: "Scheduled Id",
    Footer: "Scheduled Id",
    accessor: "schedule_id"
  },
  {
    Header: "Created By",
    Footer: "Created BY",
    accessor: "offer_id.user_id.email"
  },
  {
    Header: "Created At",
    Footer: "Created At",
    accessor: "offer_id.created_at"
  },
  {
    Header: "Scheduled By",
    Footer: "Scheduled By",
    accessor: "user_id.email"
  },
  {
    Header: "Scheduled At",
    Footer: "Scheduled At",
    accessor: "scheduled_at"
  }
]

// To be scheduled column
export const to_schedule_offer_columns = [
  {
    Header: "Offer ID",
    Footer: "Offer ID",
    accessor: "offer_id",
  },
  {
    Header: "Created At",
    Footer: "Created At",
    accessor: "created_at",
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
  },
  {
    Header: "Data",
    Footer: "Data",
    accessor: "data"
  },
  {
    Header: "Created By",
    Footer: "Created By",
    accessor: "user_id.email",
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status"
  },
]

// Customer column
export const customer_columns = [
  {
    Header: "Name",
    Footer: "Name",
    accessor: "customer_name",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "customer_email",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "customer_phone",
  }
]