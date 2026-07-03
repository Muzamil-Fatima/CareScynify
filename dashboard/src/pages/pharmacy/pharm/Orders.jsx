// import React, { useState } from "react";

// import OrdersHeader from "../../components/pharmacy/orders/OrdersHeader";
// import OrdersStats from "../../components/pharmacy/orders/OrdersStats";
// import OrdersToolbar from "../../components/pharmacy/orders/OrdersToolbar";
// import OrdersFilters from "../../components/pharmacy/orders/OrdersFilters";
// import OrdersTable from "../../components/pharmacy/orders/OrdersTable";
// import OrdersPagination from "../../components/pharmacy/orders/OrdersPagination";
// import OrdersFooter from "../../components/pharmacy/orders/OrdersFooter";

// import OrdersSkeleton from "../../components/pharmacy/orders/OrdersSkeleton";
// import EmptyOrders from "../../components/pharmacy/orders/EmptyOrders";
// import OrdersError from "../../components/pharmacy/orders/OrdersError";

// import OrderDetailsModal from "../../components/pharmacy/orders/OrderDetailsModal";
// import UpdateStatusModal from "../../components/pharmacy/orders/UpdateStatusModal";
// import CancelOrderModal from "../../components/pharmacy/orders/CancelOrderModal";

// const Orders = () => {
//   // Temporary Dummy Data
//   // Replace with Context/API later.

//   const [orders] = useState([
//     {
//       _id: "ORD-1054",
//       patient: {
//         name: "Ali Ahmed",
//         phone: "03001234567",
//       },
//       items: [
//         {
//           medicine: "Paracetamol",
//           quantity: 2,
//           price: 250,
//         },
//         {
//           medicine: "Panadol",
//           quantity: 3,
//           price: 500,
//         },
//       ],
//       totalAmount: 2000,
//       status: "Pending",
//       paymentMethod: "Cash",
//       deliveryAddress: "Lahore",
//       notes: "",
//       createdAt: new Date(),
//     },
//   ]);

//   const [loading] = useState(false);
//   const [error] = useState(false);

//   const [search, setSearch] = useState("");

//   const [filters, setFilters] = useState({
//     status: "",
//     payment: "",
//     date: "",
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatus, setShowStatus] = useState(false);
//   const [showCancel, setShowCancel] = useState(false);

//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: "",
//       payment: "",
//       date: "",
//     });
//   };

//   return (
//     <div className="space-y-6">

//       <OrdersHeader />

//       <OrdersStats
//         totalOrders={156}
//         pendingOrders={25}
//         confirmedOrders={34}
//         completedOrders={86}
//         cancelledOrders={11}
//       />

//       <OrdersToolbar
//         search={search}
//         onSearchChange={setSearch}
//         onRefresh={() => {}}
//         onExport={() => {}}
//       />

//       <OrdersFilters
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onReset={resetFilters}
//       />

//       {loading ? (
//         <OrdersSkeleton />
//       ) : error ? (
//         <OrdersError onRetry={() => {}} />
//       ) : orders.length === 0 ? (
//         <EmptyOrders />
//       ) : (
//         <>
//           <OrdersTable
//             orders={orders}
//             onView={(order) => {
//               setSelectedOrder(order);
//               setShowDetails(true);
//             }}
//             onUpdateStatus={(order) => {
//               setSelectedOrder(order);
//               setShowStatus(true);
//             }}
//           />

//           <OrdersPagination
//             currentPage={currentPage}
//             totalPages={8}
//             onPageChange={setCurrentPage}
//           />

//           <OrdersFooter
//             currentPage={currentPage}
//             itemsPerPage={10}
//             totalOrders={156}
//           />
//         </>
//       )}

//       <OrderDetailsModal
//         order={selectedOrder}
//         isOpen={showDetails}
//         onClose={() => setShowDetails(false)}
//       />

//       <UpdateStatusModal
//         order={selectedOrder}
//         isOpen={showStatus}
//         onClose={() => setShowStatus(false)}
//         onSave={(order, status) => {
//           console.log(order, status);
//         }}
//       />

//       <CancelOrderModal
//         order={selectedOrder}
//         isOpen={showCancel}
//         onClose={() => setShowCancel(false)}
//         onConfirm={(order, reason) => {
//           console.log(order, reason);
//         }}
//       />

//     </div>
//   );
// };

// export default Orders;
import React, { useState } from "react";

import OrdersHeader from "../../components/pharmacy/orders/OrdersHeader";
import OrdersStats from "../../components/pharmacy/orders/OrdersStats";
import OrdersToolbar from "../../components/pharmacy/orders/OrdersToolbar";
import OrdersFilters from "../../components/pharmacy/orders/OrdersFilters";
import OrdersTable from "../../components/pharmacy/orders/OrdersTable";
import OrdersPagination from "../../components/pharmacy/orders/OrdersPagination";
import OrdersFooter from "../../components/pharmacy/orders/OrdersFooter";

import OrdersSkeleton from "../../components/pharmacy/orders/OrdersSkeleton";
import EmptyOrders from "../../components/pharmacy/orders/EmptyOrders";
import OrdersError from "../../components/pharmacy/orders/OrdersError";

import OrderDetailsModal from "../../components/pharmacy/orders/OrderDetailsModal";
import UpdateStatusModal from "../../components/pharmacy/orders/UpdateStatusModal";
import CancelOrderModal from "../../components/pharmacy/orders/CancelOrderModal";

const Orders = () => {
  // Temporary Dummy Data
  // Replace with API data later.

  const [orders] = useState([
    {
      _id: "ORD-1054",
      patient: {
        name: "Ali Ahmed",
        phone: "03001234567",
      },
      items: [
        {
          medicine: "Paracetamol",
          quantity: 2,
          price: 250,
        },
        {
          medicine: "Panadol",
          quantity: 3,
          price: 500,
        },
      ],
      totalAmount: 2000,
      paymentMethod: "Cash",
      deliveryAddress: "Lahore, Pakistan",
      notes: "Deliver before 6 PM.",
      status: "Pending",
      createdAt: new Date(),
    },
    {
      _id: "ORD-1055",
      patient: {
        name: "Sara Khan",
        phone: "03112223344",
      },
      items: [
        {
          medicine: "Augmentin",
          quantity: 1,
          price: 1200,
        },
      ],
      totalAmount: 1200,
      paymentMethod: "Online",
      deliveryAddress: "Islamabad",
      notes: "",
      status: "Completed",
      createdAt: new Date(),
    },
  ]);

  const [loading] = useState(false);
  const [error] = useState(false);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      payment: "",
      date: "",
    });
  };

  const handleRefresh = () => {
    console.log("Refresh Orders");
  };

  const handleExport = () => {
    console.log("Export Orders");
  };

  const handleRetry = () => {
    console.log("Retry");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <OrdersHeader />

      {/* Statistics */}
      <OrdersStats
        totalOrders={156}
        pendingOrders={25}
        confirmedOrders={40}
        completedOrders={82}
        cancelledOrders={9}
      />

      {/* Search */}
      <OrdersToolbar
        search={search}
        onSearchChange={setSearch}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* Filters */}
      <OrdersFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {/* Content */}
      {loading ? (
        <OrdersSkeleton />
      ) : error ? (
        <OrdersError onRetry={handleRetry} />
      ) : orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <>
          <OrdersTable
            orders={orders}
            onView={(order) => {
              setSelectedOrder(order);
              setShowDetails(true);
            }}
            onUpdateStatus={(order) => {
              setSelectedOrder(order);
              setShowStatus(true);
            }}
            onCancel={(order) => {
              setSelectedOrder(order);
              setShowCancel(true);
            }}
          />

          <OrdersPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />

          <OrdersFooter
            currentPage={currentPage}
            itemsPerPage={10}
            totalOrders={156}
          />
        </>
      )}

      {/* Modals */}

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />

      <UpdateStatusModal
        order={selectedOrder}
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        onSave={(order, status) => {
          console.log(order, status);
        }}
      />

      <CancelOrderModal
        order={selectedOrder}
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={(order, reason) => {
          console.log(order, reason);
        }}
      />
    </div>
  );
};

export default Orders;