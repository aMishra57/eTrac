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
    
    public partial class spPaymentDesk_Result
    {
        public Nullable<long> LBLL_BLL_Id { get; set; }
        public string LocationName { get; set; }
        public string CMP_NameLegal { get; set; }
        public string LBLL_BillType { get; set; }
        public Nullable<decimal> LBLL_PoMisBdaAmount { get; set; }
        public Nullable<int> CNT_GracePeriod { get; set; }
        public string PMD_PaymentMode { get; set; }
        public System.DateTime BillDate { get; set; }
        public string CAT_Discription { get; set; }
        public string Bill_Status { get; set; }
    }
}