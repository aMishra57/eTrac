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
    
    public partial class POQuestion
    {
        public long POQ_Id { get; set; }
        public long POQ_POD_Id { get; set; }
        public long POQ_QNA_Id { get; set; }
        public string POQ_Answer { get; set; }
        public string POQ_IsActive { get; set; }
    
        public virtual QuestionAnswer QuestionAnswer { get; set; }
    }
}