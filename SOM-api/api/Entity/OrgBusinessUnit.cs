﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Entity
{
    [Table("ORG_BUSINESS_UNIT")]
    [Index(nameof(BuNameTh), Name = "UK_ORG_BUSINESS_UNIT", IsUnique = true)]
    public partial class OrgBusinessUnit
    {
        [Key]
        [Column("BU_ID", TypeName = "numeric(10, 0)")]
        public decimal BuId { get; set; }
        [Column("BU_CODE")]
        [StringLength(10)]
        public string BuCode { get; set; }
        [Required]
        [Column("BU_NAME_TH")]
        [StringLength(250)]
        public string BuNameTh { get; set; }
        [Required]
        [Column("BU_NAME_EN")]
        [StringLength(250)]
        public string BuNameEn { get; set; }
        [Required]
        [Column("ACTIVE_FLAG")]
        [StringLength(1)]
        public string ActiveFlag { get; set; }
        [Required]
        [Column("CREATE_USER")]
        [StringLength(20)]
        public string CreateUser { get; set; }
        [Column("CREATE_DTM", TypeName = "datetime")]
        public DateTime CreateDtm { get; set; }
        [Required]
        [Column("UPDATE_USER")]
        [StringLength(20)]
        public string UpdateUser { get; set; }
        [Column("UPDATE_DTM", TypeName = "datetime")]
        public DateTime UpdateDtm { get; set; }
    }
}
