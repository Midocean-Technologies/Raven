import frappe
from frappe import _

@frappe.whitelist()
def get_list():
    '''
    Fetches list of all users who have the role: Raven User
    '''

    # Check if the user is a Raven User and has he "Raven User" role
    # If not, then throw an error
    if "Raven User" not in frappe.get_roles():
        frappe.throw(_("You do not have a <b>Raven User</b> role. Please contact your administrator to add your user profile as a <b>Raven User</b>."), title="Insufficient permissions. Please contact your administrator.")
    
    if not frappe.db.exists("Raven User", { "user": frappe.session.user }):
        frappe.throw(_("You do not have a <b>Raven User</b> profile. Please contact your administrator to add your user profile as a <b>Raven User</b>."), title="Insufficient permissions. Please contact your administrator.")
    
    users = frappe.db.get_list("Raven User", fields=["full_name", "user_image",
                                   "name", "first_name"],
                           order_by="full_name")
    return users
