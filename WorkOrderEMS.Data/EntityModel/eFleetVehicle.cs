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
    
    public partial class eFleetVehicle
    {
        public eFleetVehicle()
        {
            this.eFleetFuelings = new HashSet<eFleetFueling>();
            this.eFleetMaintenances = new HashSet<eFleetMaintenance>();
            this.eFleetVehicleIncidents = new HashSet<eFleetVehicleIncident>();
            this.eFleetVehicleMasterLogs = new HashSet<eFleetVehicleMasterLog>();
            this.eFleetVehicleScanLogs = new HashSet<eFleetVehicleScanLog>();
            this.eFleetVehicleInspectionLogs = new HashSet<eFleetVehicleInspectionLog>();
            this.DefectReportDetails = new HashSet<DefectReportDetail>();
            this.eFleetPassengerTrackingCounts = new HashSet<eFleetPassengerTrackingCount>();
            this.WorkRequestAssignments = new HashSet<WorkRequestAssignment>();
        }
    
        public long VehicleID { get; set; }
        public string VehicleNumber { get; set; }
        public string QRCodeID { get; set; }
        public int QRCDefaultSize { get; set; }
        public long LocationID { get; set; }
        public string VehicleIdentificationNo { get; set; }
        public string VehicleLicensePlateNo { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public Nullable<long> FuelType { get; set; }
        public string Year { get; set; }
        public string AttachmentOfRegistration { get; set; }
        public string AttachmentOfInsurance { get; set; }
        public Nullable<System.DateTime> ExpirationDate { get; set; }
        public string VehicleImage { get; set; }
        public string GVWR { get; set; }
        public string StorageAddress { get; set; }
        public string ZipCode { get; set; }
        public string DummyField { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedDate { get; set; }
        public Nullable<bool> CheckOutStatus { get; set; }
        public string UserName { get; set; }
        public Nullable<bool> IsDamage { get; set; }
        public Nullable<bool> DamageTireStatus { get; set; }
        public Nullable<bool> InteriorMileageDriverStatus { get; set; }
        public Nullable<bool> EngineExteriorStatus { get; set; }
        public Nullable<bool> EmergencyAccessoriesStatus { get; set; }
        public string DamageTireDetails { get; set; }
        public string InteriorMileageDriverDetails { get; set; }
        public string EngineExteriorDetails { get; set; }
        public string EmergencyAccessoriesDetails { get; set; }
    
        public virtual ICollection<eFleetFueling> eFleetFuelings { get; set; }
        public virtual ICollection<eFleetMaintenance> eFleetMaintenances { get; set; }
        public virtual GlobalCode GlobalCode { get; set; }
        public virtual ICollection<eFleetVehicleIncident> eFleetVehicleIncidents { get; set; }
        public virtual ICollection<eFleetVehicleMasterLog> eFleetVehicleMasterLogs { get; set; }
        public virtual ICollection<eFleetVehicleScanLog> eFleetVehicleScanLogs { get; set; }
        public virtual ICollection<eFleetVehicleInspectionLog> eFleetVehicleInspectionLogs { get; set; }
        public virtual ICollection<DefectReportDetail> DefectReportDetails { get; set; }
        public virtual ICollection<eFleetPassengerTrackingCount> eFleetPassengerTrackingCounts { get; set; }
        public virtual ICollection<WorkRequestAssignment> WorkRequestAssignments { get; set; }
    }
}
