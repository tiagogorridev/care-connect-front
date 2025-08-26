// components/profile/ProfileHeader.js
const ProfileHeader = ({ userType, currentUser, title, description }) => {
  const getTitle = () => {
    switch (userType) {
      case "admin":
        return "Configurações do Administrador";
      case "clinic":
        return "Configurações da Clínica";
      case "patient":
        return "Configurações do Perfil";
      default:
        return "Configurações";
    }
  };

  const getDescription = () => {
    switch (userType) {
      case "admin":
        return "Gerencie suas informações e configurações de administrador";
      case "clinic":
        return "Gerencie as informações e configurações da sua clínica";
      case "patient":
        return "Gerencie suas informações pessoais e configurações de conta";
      default:
        return "Gerencie suas configurações";
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {title || getTitle()}
      </h1>
      <p className="text-gray-600 mt-2">{description || getDescription()}</p>
    </div>
  );
};

export default ProfileHeader;
