import React, { useEffect, useState } from "react";
import CovidApiService from "../../api/covid-service";
import DataTable from "react-data-table-component";
import numberHelper from "../../helpers/numberHelper";

const columns = [
  {
    name: "Country",
    selector: "Country",
    sortable: false,
  },
  {
    name: "Total Confirmed",
    sortable: false,
    cell: (item) => {
      return (
        <span className="total-text  text-dark">
          {" "}
          {numberHelper.numberFormatter(item.TotalConfirmed)}
        </span>
      );
    },
  },
  {
    name: "Total Deaths",
    sortable: false,
    cell: (item) => {
      return (
        <span className="total-text text-danger">
          {numberHelper.numberFormatter(item.TotalDeaths)}
        </span>
      );
    },
  },
  {
    name: "Total Rsecovered",
    sortable: false,
    cell: (item) => {
      return (
        <span className="total-text text-success">
          {numberHelper.numberFormatter(item.TotalRecovered)}
        </span>
      );
    },
  },
];
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="row mt-3 mb-3">
    <div children="col-md-6 ">
      <div className="input-group">
        <input
          id="search"
          type="text"
          placeholder="Filter By Name"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
          className="form-control"
        />
        <div className="input-group-append">
          <span className="input-group-text" onClick={onClear}>
            X
          </span>
        </div>
      </div>
    </div>
  </div>
);

function TableData(props) {
  const [countries, setCountries] = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pending, setPending] = useState(true);
  const [global, setGlobal] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filterData = countries.filter((item) =>
    item.Country.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    CovidApiService.getAllData().then((res) => {
      setCountries(res.Countries);
      setGlobal(res.Global);
      setPending(false);
    });
  }, []);

  const Search = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => {
          setFilterText(e.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="datable content">
      {!pending && (
        <>
          <h4 className="row world-wide-text ">
            <div className="col-md-12">Worldwide</div>
          </h4>
          <div className="row">
            <div className="col-md-4">
              <span>Total Confirmed</span>
              <br />
              <strong>{numberHelper.numberFormatter(global.TotalConfirmed)}</strong>
              <br /><small> + {numberHelper.numberFormatter(global.NewConfirmed)}</small>
            </div>
            <div className="col-md-4">
              <span>Total Deaths</span>
              <br />
              <strong className="text-danger">
                {numberHelper.numberFormatter(global.TotalDeaths)}
              </strong>
              <br /><small className="text-danger"> + {numberHelper.numberFormatter(global.NewDeaths)}</small>
            </div>
            <div className="col-md-4">
              <span>Total Recovered</span>
              <br />
              <strong className="text-success">
                {numberHelper.numberFormatter(global.TotalRecovered)}
              </strong>
              <br /><small  className="text-success"> + {numberHelper.numberFormatter(global.NewRecovered)}</small>
            </div>
          </div>
        </>
      )}

      <DataTable
        title=""
        columns={columns}
        data={filterData}
        subHeader
        subHeaderComponent={Search}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        progressPending={pending}
      />
    </div>
  );
}

export default TableData;
