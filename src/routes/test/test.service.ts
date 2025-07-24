import prisma from '@/lib/prisma/prisma';

const findAllTests = () => {
	return prisma.test.findMany();
};

const findTestById = (id: string) => {
	return prisma.test.findUnique({ where: { id } });
};

const createTest = (data: { title: string; content?: string }) => {
	return prisma.test.create({ data });
};

const updateTest = (
	id: string,
	data: Partial<{ title: string; content?: string }>,
) => {
	return prisma.test.update({ where: { id }, data });
};

const deleteTest = async (id: string) => {
	const result = await prisma.test.deleteMany({ where: { id } });
	return result.count > 0;
};

export const TestService = {
	findAll: findAllTests,
	findOne: findTestById,
	create: createTest,
	update: updateTest,
	delete: deleteTest,
};
