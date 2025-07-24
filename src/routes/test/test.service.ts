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

const deleteTest = (id: string) => {
	return prisma.test.delete({ where: { id } });
};

export const TestService = {
	findAll: findAllTests,
	findOne: findTestById,
	create: createTest,
	update: updateTest,
	delete: deleteTest,
};
