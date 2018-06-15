using System;

namespace AjaxPagination.Models
{
    public abstract class BaseEntity {}

    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public DateTime created_at { get; set; }
    }
}