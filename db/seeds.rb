ActiveRecord::Base.transaction do

  User.create!({ 
    name: "Guest User", 
    email: "guest@progressit.co", 
    password: ENV['DEFAULT_PASSWORD'], 
  })

  20.times do
    name = Faker::Name.name
    email = Faker::Internet.email(name)
    User.create!({ 
      name: name, 
      email: email, 
      password: ENV['DEFAULT_PASSWORD'],
    })
  end

end
