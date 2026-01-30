const { roles, menu, role_acceses } = require("../models");

exports.getMenusByRole = async (req, res) => {
  try {
    const { role } = req.params;
    
    let roleId = role;
    
    // Cek apakah parameter role berupa ID (angka) atau Nama (string)
    if (isNaN(parseInt(role))) {
        const roleData = await roles.findOne({ where: { role_name: role } });
        if (!roleData) {
            return res.status(404).json({ message: "Role not found" });
        }
        roleId = roleData.role_id;
    }

    const accessData = await role_acceses.findAll({
      where: { role_id: roleId },
      include: [
        {
          model: menu,
          attributes: ["menu_id", "menu_name", "menu_path"],
        },
      ],
    });

    // Extract menu object from the relation dan filter jika ada yang null
    const menus = accessData
      .map((item) => item.menu)
      .filter((item) => item !== null);

    res.status(200).json({ menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const allRoles = await roles.findAll();
    res.status(200).json(allRoles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMenus = async (req, res) => {
  try {
    const allMenus = await menu.findAll();
    res.status(200).json(allMenus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
