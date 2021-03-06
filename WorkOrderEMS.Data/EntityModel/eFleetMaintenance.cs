//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WorkOrderEMS.Data.EntityModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class eFleetMaintenance
    {
        public long MaintenanceID { get; set; }
        public long VehicleID { get; set; }
        public string VehicleNumber { get; set; }
        public long LocationID { get; set; }
        public long MaintenanceType { get; set; }
        public Nullable<System.DateTime> MaintenanceDate { get; set; }
        public Nullable<long> PmID { get; set; }
        public string ScheduledPM { get; set; }
        public string ReminderMetricDesc { get; set; }
        public string DriverName { get; set; }
        public Nullable<int> DaysOutOfService { get; set; }
        public Nullable<decimal> PartsCost { get; set; }
        public Nullable<decimal> LabourCost { get; set; }
        public Nullable<decimal> OthersCosts { get; set; }
        public Nullable<decimal> TotalCost { get; set; }
        public string Miles { get; set; }
        public string Note { get; set; }
        public string MaintenanceAttachment { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedDate { get; set; }
    
        public virtual eFleetPreventativeMaintenance eFleetPreventativeMaintenance { get; set; }
        public virtual GlobalCode GlobalCode { get; set; }
        public virtual eFleetVehicle eFleetVehicle { get; set; }
        public virtual UserRegistration UserRegistration { get; set; }
        public virtual LocationMaster LocationMaster { get; set; }
    }
}
