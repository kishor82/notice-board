import TableListing from "../TableListing";
import "./index.css";
export const Admin = () => {
  const columns = [
    { title: "Plan Year", value: "planYear" },
    { title: "Description", value: "desc" },
    { title: "Type", value: "type" },
    { title: "Current", value: "current" },
    { title: "Maximum", value: "max" },
    {
      title: "Acknowledge",
      render: function () {
        const max = this.max.toFixed(2);
        const percent = Math.round((this.current / max) * 100);
        return (
          <div
            className="balance"
            style={{
              background: `linear-gradient(to right, #f5b921 ${percent}%, #f2f2f2 ${percent}%)`,
            }}
          >
            {percent} %
          </div>
        );
      },
    },
    {
      title: "Actions",
      render: function () {
        return (
          <div className="action">
            <button
              type="button"
              onClick={() => alert("Edit")}
              className="edit_button"
            >
              <i className="fa-solid fa-pen-circle"></i>
            </button>
            <button
              type="button"
              onClick={() => alert("Delete")}
              className="delete_button"
            >
              <i className="fa-solid fa-circle-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 469.62,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 834.98,
      max: 1500,
    },
    {
      planYear: 2016,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 203.41,
      max: 3000,
    },
    {
      planYear: 2017,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 568.91,
      max: 3000,
    },
    {
      planYear: 2017,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 34.48,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 334.58,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Family",
      current: 792.09,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 269.64,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 321.46,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 393.79,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 284.33,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 504.29,
      max: 1500,
    },
    {
      planYear: 2016,
      desc: "In-Network Out-of-Pocket",
      type: "Individual",
      current: 554.94,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Family",
      current: 255.86,
      max: 1000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 254.34,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 693.35,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 674.62,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 803.1,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 181.98,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 871.33,
      max: 3000,
    },
  ];
  return (
    <section>
      <TableListing columns={columns} data={data} sortBy="current" />
    </section>
  );
};
